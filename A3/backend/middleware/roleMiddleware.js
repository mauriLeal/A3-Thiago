// Esta função recebe um array de cargos permitidos e retorna o middleware
const checkRole = (cargosPermitidos) => {
  return (req, res, next) => {
    // Pegamos os dados do usuário que o 'authMiddleware' já validou
    const { usuario } = req;

    if (!usuario || !usuario.cargos) {
      return res.status(403).json({ error: 'Acesso negado. Informações de cargo não encontradas.' });
    }

    // Verificamos se pelo menos um dos cargos do usuário está na lista de cargos permitidos
    const temPermissao = usuario.cargos.some(cargo => cargosPermitidos.includes(cargo));

    if (!temPermissao) {
      // 403 Forbidden: Eu sei quem você é, mas você não tem permissão para esta ação.
      return res.status(403).json({ error: 'Acesso negado. Você não tem o cargo necessário.' });
    }

    // Se tiver permissão, pode prosseguir para a próxima função (o controller)
    next();
  };
};

module.exports = checkRole;