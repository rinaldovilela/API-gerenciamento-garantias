const ClienteRepository = require("../repositories/ClienteRepository");

class ClienteService {
  async registrarCliente(clienteData) {
    return await ClienteRepository.create(clienteData);
  }

  async listarClientes() {
    return await ClienteRepository.findAll();
  }

  async obterCliente(clienteId) {
    return await ClienteRepository.findById(clienteId);
  }

  async atualizarCliente(clienteId, updateData) {
    return await ClienteRepository.update(clienteId, updateData);
  }

  async deletarCliente(clienteId) {
    return await ClienteRepository.delete(clienteId);
  }
}

module.exports = new ClienteService();
