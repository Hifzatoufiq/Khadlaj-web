module.exports = async function chatHandler(req, res) {
  const { handleChatRequest } = await import("../chatbot-api.mjs");
  return handleChatRequest(req, res);
};
