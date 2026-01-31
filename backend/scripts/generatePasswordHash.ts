// The code below generates a hashed password using bcrypt.
// It takes a plain text password as input and outputs the hashed version.
import { genSaltSync, hashSync } from 'bcrypt';
import prompts from 'prompts';

const generatePasswordHash = (plainPassword: string): string => {
  const saltRounds = 10; // Number of salt rounds for bcrypt
  const salt = genSaltSync(saltRounds);
  return hashSync(plainPassword, salt);
};

const run = async () => {
  const answers = await prompts<'password'>(
    {
      type: 'password',
      name: 'password',
      message: 'Enter a password to hash:',
    },
    {
      onCancel: () => true,
    },
  );

  const { password } = answers as { password: string };

  if (password) {
    const hashedPassword = generatePasswordHash(password);
    console.log('Hashed Password:', hashedPassword);
  } else {
    console.log('No password provided.');
  }
};

void run();
