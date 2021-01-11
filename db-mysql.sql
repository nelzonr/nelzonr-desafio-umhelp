CREATE TABLE `transacao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario_envio` int(11) NOT NULL,
  `id_usuario_recebedor` int(11) NOT NULL,
  `valor` decimal(12,2) NOT NULL DEFAULT '0.00',
  `estornado` tinyint(1) NOT NULL DEFAULT '0',
  `data_processamento` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_4303af63c799605abb208d61526` (`id_usuario_envio`),
  KEY `FK_e14a3ff9925c5cd7ea8ff5bdb46` (`id_usuario_recebedor`),
  CONSTRAINT `FK_e14a3ff9925c5cd7ea8ff5bdb46` FOREIGN KEY (`id_usuario_recebedor`) REFERENCES `usuario` (`id`),
  CONSTRAINT `FK_4303af63c799605abb208d61526` FOREIGN KEY (`id_usuario_envio`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `cpf` varchar(11) NOT NULL,
  `saldo` decimal(12,2) NOT NULL DEFAULT '0.00',
  `token` varchar(255) NOT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `IDX_USUARIO_CPF` (`cpf`),
  KEY `IDX_USUARIO_TOKEN` (`token`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
