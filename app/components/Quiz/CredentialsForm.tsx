import { Button, KeyboardAvoidingWrapper, RHFTextInput } from "@components";
import { zodResolver } from "@hookform/resolvers/zod";
import { colors } from "@utils/constants";
import { AnswerObject } from "@utils/types/answer";
import React, { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
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

type FormValues = z.infer<typeof validationSchema>;

type Props = {
  onSubmit: (data: FormValues) => void;
  value: AnswerObject;
};

export default memo(({ onSubmit, value }: Props) => {
  const methods = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: value?.email ?? "",
      password: value?.password ?? "",
    },
  });

  return (
    <KeyboardAvoidingWrapper>
      <FormProvider {...methods}>
        <View style={{ flex: 1 }}>
          <RHFTextInput name="email" placeholder="Enter email" />

          <RHFTextInput
            name="password"
            placeholder="Enter password"
            secureTextEntry
          />
        </View>
        <Button
          title="Next"
          disabled={!methods.formState.isValid}
          gradientColors={[colors.darkPurple, colors.lightBlue, colors.aqua]}
          onPress={methods.handleSubmit(onSubmit)}
        />
      </FormProvider>
    </KeyboardAvoidingWrapper>
  );
});
