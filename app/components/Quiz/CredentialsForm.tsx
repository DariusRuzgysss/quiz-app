import { Button, KeyboardAvoidingWrapper, RHFTextInput } from "@components";
import { zodResolver } from "@hookform/resolvers/zod";
import { colors } from "@utils/constants";
import { CredentialsFormType } from "@utils/types/answer";
import React, { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { z } from "zod";

export const validationSchema = z.object({
  email: z
    .string()
    .regex(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "Invalid email address"
    ),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type Props = {
  onSubmit: (data: CredentialsFormType) => void;
  value?: CredentialsFormType;
};

export default memo(({ onSubmit, value }: Props) => {
  const methods = useForm<CredentialsFormType>({
    mode: "onSubmit",
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: value?.email ?? "",
      password: value?.password ?? "",
    },
  });

  const values = methods.watch();

  return (
    <KeyboardAvoidingWrapper>
      <FormProvider {...methods}>
        <View style={styles.container}>
          <RHFTextInput name="email" placeholder="Enter email" />

          <RHFTextInput
            name="password"
            placeholder="Password"
            secureTextEntry
          />
        </View>
        <Button
          title="Next"
          disabled={
            methods.formState.isSubmitting ||
            values.email === "" ||
            values.password === ""
          }
          gradientColors={[colors.darkPurple, colors.lightBlue, colors.aqua]}
          onPress={methods.handleSubmit(onSubmit)}
        />
      </FormProvider>
    </KeyboardAvoidingWrapper>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
  },
});
