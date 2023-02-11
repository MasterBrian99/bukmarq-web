import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useSignIn } from 'react-auth-kit';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { loginUser } from '../../api/auth';

export default function LoginScreen() {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const loginMutation = useMutation(loginUser, {
    onSuccess: (data) => {
      console.log(data.data?.access_token);
      if (data.data) {
        if (
          signIn({
            token: data.data?.access_token,
            expiresIn: 600,
            tokenType: 'Bearer',
            authState: data.data,
          })
        ) {
          // Redirect or do-something
          navigate('/', { replace: true });
          location.reload();
        }
      }
    },
    onError: (err) => {
      // console.log(err.response?.data.error);
      console.log(err);
    },
  });

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor<'a'> href="#" size="sm" onClick={(event) => event.preventDefault()}>
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" />
        <Group position="apart" mt="lg">
          <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
          <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button
          fullWidth
          mt="xl"
          onClick={(e) => {
            e.preventDefault();
            loginMutation.mutate({
              data: {
                username: 'bdssf',
                password: '1234',
              },
            });
          }}
        >
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
