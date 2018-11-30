'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },  
    
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },

    topicId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Post.associate = function(models) {
    
    Post.belongsTo(models.Topic, {
      foreignKey: "topicId",
      onDelete: "CASCADE"
    });
  };
  return Post;
};