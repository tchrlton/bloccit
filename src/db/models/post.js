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
      type: DataTypes.INTEGER,
      allowNull: false
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Post.associate = function(models) {

    Post.belongsTo(models.Topic, {
      foreignKey: "topicId",
      onDelete: "CASCADE"
    });

    Post.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    Post.hasMany(models.Comment, {
      foreignKey: "postId",
      as: "comments"
    });

    Post.hasMany(models.Vote, {
      foreignKey: "postId",
      as: "votes"
    });
  };

  Post.prototype.getPoints = function(){
    if(this.votes.length === 0) return 0
    return this.votes
      .map((v) => { return v.value })
      .reduce((prev, next) => { return prev + next });
  };

  Post.prototype.hasUpvoteFor = function(){
    if(this.votes.userId === this.userId) return 'true';
  };
  
  Post.prototype.hasDownvoteFor = function(){
    if(this.votes.userId === this.userId) return 'true';
  };

  return Post;
};