import { DataTypes } from "sequelize";
import sequelize from "../../config/database";

const Url = sequelize.define("urls", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  slug: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false },
  hitCount: { field: "hit_count", type: DataTypes.INTEGER },
  createdAt: {
    field: "created_at",
    type: DataTypes.DATE,
  },
  updatedAt: {
    field: "updated_at",
    type: DataTypes.DATE,
  },
});

export default Url;
