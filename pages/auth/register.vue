<script lang="ts" setup>
import { useForm } from "vee-validate";
import * as Yup from "yup";
import { RegisterFormValues, UserResponse } from "~~/types/allTypes";

definePageMeta({
  layout: "login-and-register",
});

const client = useSupabaseAuthClient();

const emailSchema = Yup.string()
  .email()
  .required()
  .label("Email address")
  .matches(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    "Must be a valid email address"
  );

const passwordSchema = Yup.string()
  .label("Password")
  .min(8)
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  )
  .required();

const confirmPassword = Yup.string()
  .label("Confirm password")
  .oneOf([Yup.ref("password")], "Passwords must match")
  .required();

const { handleSubmit, isSubmitting, errors, setErrors } = useForm<RegisterFormValues>({
  validationSchema: Yup.object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword,
  }),
});

const onSubmit = handleSubmit(async (values, action) => {
  try {
    const router = useRouter();
    const { email, password } = values;
    const { data, pending, error, refresh } = await useFetch("/api/user/create-user", {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      })
    })
    action.resetForm()
    if (!data.value) {
      throw new Error('No data')
    }
    const typedData = data.value as UserResponse
    if (typedData.statusCode !== 200) {
      console.log(typedData.error)
      setErrors({
        email: typedData.error,
      })
      return
    }
    else {
      router.push('/dashboard')
    }
  } catch (err) {
    console.log(err);
    action.resetForm()
  }
});

const signInWithGoogle = async () => {
  try {
    const { error } = await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/protected/dashboard",
      }
    })
    if (error) {
      console.error(error);
    }
  } catch (err) {
    console.error(err);
  }
};

const signInWithGitHub = async () => {
  try {
    const { error } = await client.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/protected/dashboard",
      }
    })
    if (error) {
      console.error(error);
    }
  } catch (err) {
    console.error(err);
  }
};

</script>
<template>
  <PageWrapper class="flex-1 flex">
    <PageBody class="flex-1 flex justify-center">
      <PageSection class="bg-gray-50 dark:bg-gray-900">
        <div
          class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
        >
          <a
            href="/"
            class="flex items-center mb-6 text-4xl font-extrabold text-gray-900 dark:text-white uppercase"
          >
            Catatropic project
          </a>
          <div
            class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
          >
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1
                class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
              >
                Create an account
              </h1>
              <div class="flex justify-between items-center mb-6">
                <button
                  class="hover:bg-gray-600 text-white font-bold p-2 rounded border w-40 text-sm"
                  @click.prevent="signInWithGoogle()"
                >
                  Sign in with Google
                </button>
                <div class="flex-1"></div>
                <button
                  class="hover:bg-gray-600 text-white font-bold p-2 rounded w-40 text-sm border"
                  @click.prevent="signInWithGitHub()"
                >
                  Sign in with GitHub
                </button>
              </div>
              <div class="flex flex-row justify-center mb-6 items-center">
                <div class="border-t border-gray-700 w-1/2"></div>
                <span class="mx-4 text-gray-500 font-bold">or</span>
                <div class="border-t border-gray-700 w-1/2"></div>
              </div>
              <form class="space-y-4 md:space-y-6" @submit="onSubmit">
                <InputTextWithValidation
                  label="Email address"
                  name="email"
                  :validation="emailSchema"
                  initialValue="quankhuc99@gmail.com"
                />
                <InputTextWithValidation
                  label="Password"
                  name="password"
                  :validation="passwordSchema"
                  type="password"
                  initialValue="Khanhquan226!"
                />
                <InputTextWithValidation
                  label="Confirm password"
                  name="confirmPassword"
                  :validation="confirmPassword"
                  type="confirmPassword"
                  initialValue="Khanhquan226!"
                />
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                      checked
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="terms"
                      class="font-light text-gray-500 dark:text-gray-300"
                      >I accept the
                      <a
                        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                        >Terms and Conditions</a
                      ></label
                    >
                  </div>
                </div>
                <Button
                  label="Create an account"
                  type="submit"
                  class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 !border-none"
                />
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?
                  <a
                    href="/auth/login"
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >Login here</a
                  >
                </p>
              </form>
            </div>
          </div>
        </div>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
