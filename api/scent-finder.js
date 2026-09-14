module.exports = async function scentFinderHandler(req, res) {
  const { handleScentFinderRequest } = await import("../chatbot-api.mjs");
  return handleScentFinderRequest(req, res);
};
