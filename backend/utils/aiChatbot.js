const axios = require('axios');
const { OpenAI } = require('openai');
const config = require('config');

// Initialize OpenAI API client (or any AI platform you choose)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // You can use your API key here
});

// Function to handle chatbot response
const getChatbotResponse = async (userInput) => {
  try {
    // Send the user input to OpenAI for processing (or another AI platform of your choice)
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Or another model, depending on availability
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant designed to answer customer support questions.',
        },
        {
          role: 'user',
          content: userInput,
        },
      ],
    });

    // Return the response from the AI
    const botReply = response.choices[0].message.content.trim();
    return botReply;
  } catch (error) {
    console.error('Error getting chatbot response:', error);
    return 'Sorry, something went wrong. Please try again later.';
  }
};

// Function to log user queries (optional)
const logUserQuery = async (userInput) => {
  try {
    // You can store the user queries to a database for later analysis
    console.log('User Query:', userInput);
    // Example: Store to database here (MongoDB, SQL, etc.)
  } catch (error) {
    console.error('Error logging user query:', error);
  }
};

// Function to handle chatbot requests (Express route or similar)
const handleChatRequest = async (req, res) => {
  try {
    const userInput = req.body.userInput;

    // Log the user query
    await logUserQuery(userInput);

    // Get response from AI chatbot
    const botReply = await getChatbotResponse(userInput);

    // Return the AI's response
    res.json({ success: true, reply: botReply });
  } catch (error) {
    console.error('Error in handling chat request:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  handleChatRequest,
};
