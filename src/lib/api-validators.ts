import { Configuration, OpenAIApi } from 'openai';
import twilio from 'twilio';

export async function validateOpenAIKey(apiKey: string): Promise<boolean> {
  try {
    const configuration = new Configuration({
      apiKey,
    });
    const openai = new OpenAIApi(configuration);
    
    // Make a simple API call to test the key
    await openai.listModels();
    return true;
  } catch (error) {
    return false;
  }
}

export async function validateTwilioCredentials(
  accountSid: string,
  authToken: string
): Promise<boolean> {
  try {
    const client = twilio(accountSid, authToken);
    
    // Make a simple API call to test the credentials
    await client.api.accounts(accountSid).fetch();
    return true;
  } catch (error) {
    return false;
  }
}
