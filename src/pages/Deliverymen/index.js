import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Input } from '@rocketseat/unform';
import {
  MdAdd,
  MdSearch,
  MdEdit,
  MdDeleteForever,
  MdRefresh,
} from 'react-icons/md';

import api from '~/services/api';

import history from '~/services/history';

import {
  Container,
  StyledLink,
  Button,
  ActionButton,
  ContextMenu,
  ModalBox,
  ModalShow,
  BodyContent,
} from './styles';

export default function Deliverymen() {
  const [page, setPage] = useState(1);
  const [deliverymans, setDeliverymans] = useState([]);
  const [oneDeliveryman, setOneDeliveryman] = useState({});
  const [reg, setReg] = useState(null);
  const [productName, setProductName] = useState('');
  const [visible, setVisible] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePrevPage() {
    setPage(page - 1);
  }

  useEffect(() => {
    setLoading(true);
    async function loadDelivermans() {
      const response = await api.get('deliverymans', {
        params: { page, productName },
      });

      console.tron.log(response);

      const data = response.data.map(deliveryman => {
        return {
          ...deliveryman,
          avatarUrl:
            deliveryman.id && deliveryman.avatar
              ? deliveryman.avatar.url
              : `https://avatar.oxro.io/avatar?name=`,
        };
      });

      setReg(response.data.count);
      setLoading(false);
      setDeliverymans(data);
    }
    loadDelivermans();
  }, [page, productName, reg]);

  async function handleDelete(id) {
    // eslint-disable-next-line no-alert
    if (window.confirm('Deseja excluir este entregador?') === true) {
      try {
        const response = await api.delete(`deliverymans/${id}`);

        if (response.data.error) {
          throw response.data;
        }

        setDeliverymans(
          deliverymans.filter(deliveryman => deliveryman.id !== id)
        );

        toast.success('O entregador foi excluído com sucesso!');
      } catch (err) {
        toast.error(err.error);
      }
    }
  }

  function handleVisible(deliveryman) {
    if (deliveryman === visible) {
      setVisible(0);
      return;
    }
    setVisible(deliveryman);
  }

  function handleShow(deliveryman) {
    setModalShow(!modalShow);
    setOneDeliveryman(deliveryman);
  }

  return (
    <>
      <ModalShow visible={modalShow}>
        <ModalBox>
          <button type="button" onClick={handleShow}>
            X
          </button>
          <p className="modalTitle">Informações do entregador</p>
          <p>
            {oneDeliveryman.recipient && oneDeliveryman.recipient.street}
            <span>, </span>
            {oneDeliveryman.recipient && oneDeliveryman.recipient.number}
          </p>
          <p>
            {oneDeliveryman.recipient && oneDeliveryman.recipient.city}
            <span> - </span>
            {oneDeliveryman.recipient && oneDeliveryman.recipient.state}
          </p>
          <p>{oneDeliveryman.recipient && oneDeliveryman.recipient.cep}</p>
          <hr />
          <p className="modalTitle">Datas</p>
          <p>
            <strong>Retirada:</strong>{' '}
            {oneDeliveryman && oneDeliveryman.startDateFormatted}
          </p>
          <p>
            <strong>Entrega:</strong>{' '}
            {oneDeliveryman && oneDeliveryman.endDateFormatted}
          </p>
          <hr />
          <p className="modalTitle">Assinatura do destinatário</p>
          {oneDeliveryman.signature ? (
            <img
              src={oneDeliveryman.signature.url}
              alt={oneDeliveryman.signature.name}
            />
          ) : (
            <p>Não há nenhuma assinatura registrada.</p>
          )}
        </ModalBox>
      </ModalShow>

      <Container>
        <header>
          <p>Gerenciando entregadores</p>
        </header>
        <div>
          <div className="search">
            <MdSearch size={20} color="#999999" />

            <Input
              name="search"
              type="text"
              placeholder="Buscar por entregadores"
              value={productName}
              onChange={e => [setProductName(e.target.value), setPage(1)]}
            />
          </div>

          <StyledLink to="/deliverymans/edit" type="button">
            <MdAdd size={20} color="#fff" />
            CADASTRAR
          </StyledLink>
        </div>

        <BodyContent visible={loading}>
          <div className="loadingIndicator">
            <MdRefresh size={100} color="#7d40e7" />
          </div>
          <div className="table">
            <div className="line lineTitle">
              <div className="tableTitle">ID</div>
              <div className="tableTitle">Foto</div>
              <div className="tableTitle">Nome</div>
              <div className="tableTitle">Email</div>
              <div className="tableTitle">Ações</div>
            </div>

            {reg !== 0 ? (
              ''
            ) : (
              <span className="noData">Nenhuma encomenda foi localizada.</span>
            )}

            {deliverymans.map(deliveryman => (
              <div key={deliveryman.id} className="line">
                <div className="tableTitle">#{deliveryman.id}</div>
                <div className="tableTitle">
                  <img
                    src={
                      deliveryman.id && deliveryman.avatar
                        ? deliveryman.avatar.url
                        : `${deliveryman.avatarUrl}Sem+Entregador`
                    }
                    alt="avatar"
                  />
                </div>
                <div className="tableTitle">{deliveryman.name}</div>

                <div className="tableTitle">{deliveryman.email}</div>
                <div className="tableTitle">
                  <ActionButton
                    focusOut={() => handleVisible(deliveryman.id)}
                    onClick={() => handleVisible(deliveryman.id)}
                  >
                    {deliveryman.id === visible ? ' X' : '...'}
                  </ActionButton>
                  <ContextMenu
                    available
                    visible={visible === deliveryman.id}
                    className={deliveryman.id}
                  >
                    <ul>
                      <li>
                        {' '}
                        <MdEdit size={20} color="#4D85EE" />{' '}
                        <button
                          type="button"
                          onClick={() =>
                            history.push(
                              `/deliverymans/edit/${deliveryman.id}`,
                              {
                                deliveryman,
                              }
                            )
                          }
                        >
                          Editar
                        </button>
                      </li>
                      <span className="actionDelete">
                        <li>
                          {' '}
                          <MdDeleteForever size={20} color="#DE3B3B" />{' '}
                          <button
                            type="button"
                            onClick={() => handleDelete(deliveryman.id)}
                          >
                            Excluir
                          </button>
                        </li>
                      </span>
                    </ul>
                  </ContextMenu>
                </div>
              </div>
            ))}
          </div>
        </BodyContent>

        <footer>
          <Button type="button" onClick={handlePrevPage} disabled={page === 1}>
            Página anterior
          </Button>
          <Button
            type="button"
            onClick={handleNextPage}
            disabled={
              (page !== 1 && reg / 4 <= page) ||
              (page === 1 && deliverymans.length < 4) ||
              (productName !== '' && reg === 4) ||
              reg === 4
            }
          >
            Próxima página
          </Button>
        </footer>
      </Container>
    </>
  );
}
