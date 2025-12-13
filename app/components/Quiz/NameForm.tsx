import { Button, KeyboardAvoidingWrapper, RHFTextInput } from "@components";
import { zodResolver } from "@hookform/resolvers/zod";
import { colors } from "@utils/constants";
import { NameFormType } from "@utils/types/answer";
import React, { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import { z } from "zod";

export const validationSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 characters"),
});

type Props = {
  onSubmit: (data: NameFormType) => void;
  value?: string;
};

export default memo(({ onSubmit, value = "" }: Props) => {
  const methods = useForm<NameFormType>({
    // mode: "onSubmit",
    resolver: zodResolver(validationSchema),
    defaultValues: { name: value },
  });

  return (
    <KeyboardAvoidingWrapper>
      <FormProvider {...methods}>
        <View style={{ flex: 1 }}>
          <RHFTextInput name="name" placeholder="Name" />
        </View>
        <Button
          title="Next"
          disabled={
            methods.formState.isSubmitting || methods.watch().name === ""
          }
          gradientColors={[colors.darkPurple, colors.lightBlue, colors.aqua]}
          onPress={methods.handleSubmit(onSubmit)}
        />
      </FormProvider>
    </KeyboardAvoidingWrapper>
  );
});
