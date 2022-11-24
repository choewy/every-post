import { SnakeNamingStrategy } from 'typeorm-naming-strategy';
import { registerAs } from '@nestjs/config';
import { DateTime } from 'luxon';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ConfigKey } from './enums';

export default registerAs(
  ConfigKey.TypeOrm,
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: '127.0.0.1',
    port: 33061,
    username: 'root',
    password: undefined,
    database: 'test',
    entities: [process.cwd() + '/dist/entities/*.entity.{ts,js}'],
    autoLoadEntities: true,
    namingStrategy: new SnakeNamingStrategy(),
    logging: true,
    synchronize: true,
    dropSchema: true,
    extra: {
      typeCast: (field, next) => {
        const { type } = field;

        if (type === 'DATE') {
          const val = field.string();

          return val === null ? null : DateTime.fromFormat(val, 'yyyy-MM-dd');
        } else if (type === 'DATETIME') {
          const val = field.string();

          return val === null
            ? null
            : DateTime.fromFormat(val, 'yyyy-MM-dd HH:mm:ss');
        } else {
          return next();
        }
      },
    },
  }),
);
