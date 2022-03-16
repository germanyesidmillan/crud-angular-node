const { createLogger, format, transports } = require("winston");

class Logger {
  constructor({ config }) {
    const enumerateErrorFormat = format((info) => {
      if (info.level === "error") {
        info.message = `${info.message} [stack]: ${info.stack}`;
      }
      return info;
    });

    const logger = createLogger({
      defaultMeta: {
        service: config.services.name,
      },
      transports: [
        new transports.Console({
          level: "debug",
          format: format.combine(
            enumerateErrorFormat(),
            format.colorize(),
            format.splat(),
            format.timestamp({
              format: "YYYY-MM-DD HH:mm:ss",
            }),
            //format.simple()
            format.printf(
              (info) =>
                `${info.timestamp} service: ${info.service} [${info.level}]: ${info.message} ` +
                (info.splat !== undefined ? `${info.splat}` : " ")
            )
          ),
        }),
      ],
    });

    if (config.logging && config.logging.http) {
      const { Seq } = require("winston-seq");
      logger.add(new Seq(config.logging.http));
    }

    return logger;
  }
}

module.exports = Logger;
