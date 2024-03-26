## Sobre o Projeto

Este é o repositório da api do chat realtime. Essa api foi desenvolvida em
Node.JS, express.JS e Knex.JS para manipulação do Banco de Dados. Sendo o app
nativo para Android e IOS desenvolvido em React Native. Nesse repositório possui
apenas o código do app nativo. O Repositório com a Api é:
[chat_app_api](https://github.com/HildodeJesus/chat_app_api)

### Entre em contato comigo:

[Meu Linkedin](https://www.linkedin.com/in/hildo-jesus/)
[Meu Instagram](https://www.linkedin.com/in/hildo-jesus/)

## Documentação da API

#### Pegar um usuário no BD através da número do usuário

```http
  GET /api/user/
```

| Parâmetro | Tipo     | Descrição                                                    |
| :-------- | :------- | :----------------------------------------------------------- |
| `code`    | `string` | **Obrigatório**. Código que o cliente recebeu por SMS        |
| `phone`   | `string` | **Obrigatório**. Celular do cliente cadastrado anteriormente |

#### Logar em alguma conta com um número de celular

```http
  POST /api/user/login
```

| Parâmetro | Tipo     | Descrição                           |
| :-------- | :------- | :---------------------------------- |
| `phone`   | `string` | **Obrigatório**. Celular do cliente |

#### Validar o código que o cliente recebeu pelo e-mail

```http
  POST /api/user/validate_user
```

| Parâmetro | Tipo     | Descrição                                                    |
| :-------- | :------- | :----------------------------------------------------------- |
| `code`    | `string` | **Obrigatório**. Código que o cliente recebeu por SMS        |
| `phone`   | `string` | **Obrigatório**. Celular do cliente cadastrado anteriormente |
