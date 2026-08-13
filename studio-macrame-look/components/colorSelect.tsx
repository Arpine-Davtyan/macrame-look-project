import { Button, Card, Flex, Stack, Text } from "@sanity/ui";
import { set, type StringInputProps } from "sanity";
import { useState } from "react";
import { standardColors } from "../lib/constants/product";

export function ColorSelect(props: StringInputProps) {
    const { value, onChange } = props;

    const [open, setOpen] = useState(false);

    const selectedColor = standardColors.find(
        (color) => color.name === value
    );

    return (
        <Stack space={2}>
            <Button
                mode="ghost"
                padding={3}
                onClick={() => setOpen(!open)}
                text={
                    selectedColor
                        ? `${selectedColor.title} — ${selectedColor.value}`
                        : "Ընտրել գույն"
                }
            />

            {selectedColor && (
                <Flex align="center" gap={3}>
                    <div
                        style={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            backgroundColor: selectedColor.value,
                            border: "1px solid #ddd",
                        }}
                    />

                    <Stack space={1}>
                        <Text size={1}>
                            {selectedColor.title}
                        </Text>

                        <Text size={1} muted>
                            {selectedColor.value}
                        </Text>
                    </Stack>
                </Flex>
            )}

            {open && (
                <Card
                    padding={2}
                    radius={2}
                    shadow={2}
                >
                    <Stack space={1}>
                        {standardColors.map((color) => (
                            <Button
                                key={color.name}
                                mode={
                                    value === color.name
                                        ? "default"
                                        : "bleed"
                                }
                                padding={2}
                                onClick={() => {
                                    onChange(set(color.name));
                                    setOpen(false);
                                }}
                            >
                                <Flex align="center" gap={3}>
                                    <div
                                        style={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: "50%",
                                            backgroundColor:
                                                color.value,
                                            border: "1px solid #ddd",
                                        }}
                                    />

                                    <Text size={1}>
                                        {color.title}
                                    </Text>

                                    <Text
                                        size={1}
                                        muted
                                    >
                                        {color.value}
                                    </Text>
                                </Flex>
                            </Button>
                        ))}
                    </Stack>
                </Card>
            )}
        </Stack>
    );
}