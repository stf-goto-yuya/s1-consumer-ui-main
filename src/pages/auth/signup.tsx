import AllDone from '@/src/components/all-done'
import AlreadyRegistered from '@/src/components/already-registered'
import PortalSignup from '@/src/components/portal-signup'
import SentinelOneSignin, {
  SignupForm,
} from '@/src/components/sentinel-one-signin'
import { SignupFlowStatus } from '@/src/constants/signup-flow-status'
import { withRejectSignin } from '@/src/hocs/with-reject-signin'
import { User } from '@/src/interfaces/sentinel-one/user'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import SentinelOneSso from '@/src/components/sentinel-one-sso'
import SsoMailSent from '@/src/components/sso-mail-sent'
import SsoMailResend from '@/src/components/sso-mail-resend'

const SignupFlow = () => {
  const toast = useToast()
  const [status, setStatus] = useState<SignupFlowStatus>(
    SignupFlowStatus.SENTINEL_ONE_SIGNIN,
  )

  const onSubmit = async (values: SignupForm) => {
    const { email, password } = values

    try {
      const res = await axios.post(`/api/users/login`, {
        password,
        username: email,
      })

      if (res.status === 200) {
        setStatus(SignupFlowStatus.PORTAL_SIGNUP)

        const {
          data: { data: users },
        }: { data: { data: Array<User> } } = await axios.get(
          `/api/users?email=${email}`,
        )

        const { id } = users[0]

        const res = await axios.post(`/api/users`, {
          username: email,
          password,
          sentinelOneId: id,
        })

        if (res.data.statusCode !== 400) {
          setStatus(SignupFlowStatus.ALL_DONE)

          signIn('credentials', {
            username: email,
            password,
          })
        } else {
          setStatus(SignupFlowStatus.USER_ALREADY_REGISTERED)
        }
      }
    } catch (err: any) {
      console.log(err)
      const msg = err?.response?.data?.name

      if (msg === 'S1_ACCOUNT_LOCKED') {
        toast({
          title: 'アカウントがロックされました',
          description:
            'SentinelOneアカウントがロックされました、しばらく時間をおいて再度ログインください',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }

      if (msg === 'not authorized') {
        toast({
          title: 'SentinelOneにログインできません',
          description: 'IDとパスワードをご確認ください。',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }
  }

  const onSsoSignup = async (values: any) => {
    try {
      const {
        data: { statusCode, message },
      } = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/users/sso`, {
        username: values.email,
      })

      if (message && message.includes('dup key')) {
        setStatus(SignupFlowStatus.SENTINEL_ONE_SSO_RESEND)
      }

      if (statusCode === 200) {
        setStatus(SignupFlowStatus.SENTINEL_ONE_SSO_PENDING)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const onSsoMailResend = async (values: any) => {
    try {
      const {
        data: { statusCode, message },
      } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/users/sso/resend`,
        {
          username: values.email,
        },
      )

      // if (message.includes('dup key')) {
      //   setStatus(SignupFlowStatus.SENTINEL_ONE_SSO_RESEND)
      // }

      if (statusCode === 200) {
        setStatus(SignupFlowStatus.SENTINEL_ONE_SSO_PENDING)
      }
    } catch (err) {
      console.log(err)
    }
  }

  switch (status) {
    case SignupFlowStatus.SENTINEL_ONE_SIGNIN:
      return <SentinelOneSignin onSubmit={onSubmit} setStatus={setStatus} />
    case SignupFlowStatus.SENTINEL_ONE_SSO:
      return <SentinelOneSso onSubmit={onSsoSignup} setStatus={setStatus} />
    case SignupFlowStatus.SENTINEL_ONE_SSO_PENDING:
      return <SsoMailSent />
    case SignupFlowStatus.SENTINEL_ONE_SSO_RESEND:
      return <SsoMailResend onSubmit={onSsoMailResend} />
    case SignupFlowStatus.PORTAL_SIGNUP:
      return <PortalSignup />
    case SignupFlowStatus.ALL_DONE:
      return <AllDone />
    case SignupFlowStatus.USER_ALREADY_REGISTERED:
      return <AlreadyRegistered />
    default:
      return <div>エラー</div>
  }
}

export default withRejectSignin(SignupFlow)
