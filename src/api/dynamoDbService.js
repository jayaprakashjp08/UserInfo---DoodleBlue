module.exports = (config, docClient) => {
  return {
    getTableItems: async (req, res) => {
      let params = {
        TableName: "Organization",
        Key: {},
      };
      await docClient.get(params, (err, items) => {
        if (err) {
          console.log("Error occurred while getTableItems ", err);
          res.status(500).json({
            status: false,
            data: err,
          });
        } else {
          console.log("Got successfully");
          res.status(200).json({
            status: true,
            data: items,
          });
        }
      });
    },
  };
};
