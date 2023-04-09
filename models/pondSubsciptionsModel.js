const db = require('../database');

function createSubscription(subscription) {
  return db('pond_subscriptions').insert(subscription, ['subscriber_id', 'pond_id']);
}

function deleteSubscriptionBySubscriberIDAndPondID(subscriber_id, pond_id) {
  return db('pond_subscriptions').where({ subscriber_id, pond_id }).del();
}

function findSubscriptionsBySubscriberID(subscriber_id) {
  return db('pond_subscriptions')
  .where({ 'pond_subscriptions.subscriber_id': subscriber_id })
  .join('users', 'pond_subscriptions.subscriber_id', '=', 'users.id')
  .join('ponds', 'pond_subscriptions.pond_id', '=', 'ponds.id')
  .select('pond_subscriptions.subscriber_id', 'pond_subscriptions.pond_id', 'users.username as subscriber_username', 'ponds.name as pond_name');
}

function findSubscriptionBySubscriberIDAndPondID(subscriber_id, pond_id) {
  return db('pond_subscriptions')
  .where({ subscriber_id, pond_id })
  .join('users', 'pond_subscriptions.subscriber_id', '=', 'users.id')
  .join('ponds', 'pond_subscriptions.pond_id', '=', 'ponds.id')
  .select('subscriber_id', 'pond_id', 'users.username as subscriber_username', 'ponds.name as pond_name')
  .first();
}

module.exports = {
  createSubscription,
  deleteSubscriptionBySubscriberIDAndPondID,
  findSubscriptionsBySubscriberID,
  findSubscriptionBySubscriberIDAndPondID
}