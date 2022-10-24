import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  declare id: number;
  declare email: string;
  declare name: string;
  declare password: string;
  declare role: string;
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: { type: STRING, allowNull: false },
  role: { type: STRING, allowNull: false },
  email: { type: STRING, allowNull: false },
  password: { type: STRING, allowNull: false },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default User;
