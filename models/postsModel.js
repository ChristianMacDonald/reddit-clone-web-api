const db = require('../database');

function createPost(post) {
  return db('posts').insert(post, ['id']);
}

function deletePostByID(id) {
  return db('posts').where({ id }).del();
}

function findAllPosts() {
  return db('posts')
  .join('users', 'posts.author_id', '=', 'users.id')
  .join('ponds', 'posts.pond_id', '=', 'ponds.id')
  .select(
    'posts.id',
    'posts.author_id',
    'users.username as author_username',
    'posts.pond_id',
    'ponds.name as pond_name',
    'posts.title',
    'posts.content'
  );
}

function findPostByID(id) {
  return db('posts')
  .where({ 'posts.id': id })
  .join('users', 'posts.author_id', '=', 'users.id')
  .join('ponds', 'posts.pond_id', '=', 'ponds.id')
  .select(
    'posts.id',
    'posts.author_id',
    'users.username as author_username',
    'posts.pond_id',
    'ponds.name as pond_name',
    'posts.title',
    'posts.content'
  )
  .first();
}

function findPostsByAuthorID(author_id) {
  return db('posts')
  .where({ author_id })
  .join('users', 'posts.author_id', '=', 'users.id')
  .join('ponds', 'posts.pond_id', '=', 'ponds.id')
  .select(
    'posts.id', 
    'posts.author_id',
    'users.username as author_username', 
    'posts.pond_id',
    'ponds.name as pond_name',
    'posts.title',
    'posts.content'
  );
}

function findPostsByPondID(pond_id) {
  return db('posts')
  .where({ pond_id })
  .join('users', 'posts.author_id', '=', 'users.id')
  .join('ponds', 'posts.pond_id', '=', 'ponds.id')
  .select(
    'posts.id', 
    'posts.author_id',
    'users.username as author_username', 
    'posts.pond_id',
    'ponds.name as pond_name',
    'posts.title',
    'posts.content'
  );
}

function updatePostByID(id, changes) {
  return db('posts').where({ id }).update(changes);
}

module.exports = {
  createPost,
  deletePostByID,
  findAllPosts,
  findPostByID,
  findPostsByAuthorID,
  findPostsByPondID,
  updatePostByID
}