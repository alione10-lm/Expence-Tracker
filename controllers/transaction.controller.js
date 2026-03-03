const addTransaction = async (req, res) => {
  try {
    const { type, title, date, amount, category } = req.body;

    const transaction = await Transaction.create({
      type,
      title,
      amount,
      category,
      date,
    });

    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    res.status(400).json("failed to create transaction !");
  }
};
