# Criar conta

# Fazer Logon

# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando o seu e-mail.
- O usuário deve receber um e-mail com instruções de recuperação de senha.
- O usuário deve poder resetar sua senha.

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento.
- Utilizar o Amazon SES para envios em produção.
- O envio de e-mail deve acontecer em segundo plano (background job).

**RN**

- O link enviado por e-mail para resetar senha, deve expirar em 2 horas.
- O usuário precisa confirmar a nova senha ao resetar sua senha.

# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome, e-mail e senha.

**RNF**

**RN**

- O usuário não pode alterar seu e-mail já utilizado.
- Para atualizar sua senha, o usuário deve informar a senha antiga.
- Para atualizar sua senha, o usuário precisa confirmar a nova senha.

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico.
- O prestador deve receber uma notificação sempre que houver um novo agendamento.
- O prestador deve visualizar as notificações não lidas.

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache.
- As notificações do prestador devem ser armazenadas no MongoDB.
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io.

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar.

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos prestadores de serviço cadastrados.
- O usuário deve poder listar os dias de um mês com pelo menos um hórario disponível de um prestado.
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador.
- O usuário deve poder realizar um novo agendamento com um prestador.

**RNF**

- A listagem de prestadores deve ser armazenada em cache.

**RN**

- Cada agendamento deve durar 1 hora exatamente.
- Os agendamentos devem estar disponíveis entre 8 horas às 18 horas.
- O úsuario não pode agendar em um horário já ocupado.
- O úsuario não pode agendar em um horário que já passou.
- O usuário não pode agendar serviços consigo mesmo.
