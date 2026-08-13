import React from "react";
import {
    Card,
    Flex,
    Stack,
    Text,
    Button,
} from "@sanity/ui";
import { set, unset, useClient } from "sanity";
import type { ReferenceInputProps } from "sanity";

type StandardColor = {
    _id: string;
    title: string;
    value?: {
        hex?: string;
    };
};

export function StandardColorInput(
    props: ReferenceInputProps
) {
    const {
        value,
        onChange,
    } = props;

    const client = useClient({
        apiVersion: "2025-01-01",
    });

    const [colors, setColors] = React.useState<
        StandardColor[]
    >([]);

    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        client
            .fetch<StandardColor[]>(
                `*[
                    _type == "standardColor"
                ] | order(title asc) {
                    _id,
                    title,
                    value
                }`
            )
            .then(setColors);
    }, [client]);

    const selected = colors.find(
        (color) => color._id === value?._ref
    );

    return (
        <Stack space={2}>
            {/* Selected color */}

            <Button
                mode="ghost"
                padding={3}
                onClick={() =>
                    setOpen((prev) => !prev)
                }
            >
                <Flex
                    align="center"
                    gap={3}
                >
                    {!selected?.title || (
                        <div
                            style={{
                                width: 24,
                                height: 24,
                                minWidth: 24,
                                borderRadius: "50%",
                                backgroundColor:
                                    selected?.value?.hex ||
                                    "#e5e5e5",
                                border:
                                    "1px solid #ccc",
                            }}
                        />
                    )}

                    <Text size={1}>
                        {selected?.title ||
                            "Ընտրեք գույն"}
                    </Text>
                </Flex>
            </Button>

            {/* Dropdown */}

            {open && (
                <Card
                    padding={2}
                    radius={2}
                    shadow={1}
                    style={{
                        maxHeight: 300,
                        overflowY: "auto",
                    }}
                >
                    <Stack space={1}>
                        {colors.map((color) => {
                            const isSelected =
                                color._id ===
                                value?._ref;

                            return (
                                <Button
                                    key={color._id}
                                    mode={
                                        isSelected
                                            ? "default"
                                            : "ghost"
                                    }
                                    padding={3}
                                    onClick={() => {
                                        onChange(
                                            set({
                                                _type:
                                                    "reference",
                                                _ref:
                                                    color._id,
                                            })
                                        );

                                        setOpen(false);
                                    }}
                                >
                                    <Flex
                                        align="center"
                                        gap={3}
                                    >
                                        <div
                                            style={{
                                                width: 22,
                                                height: 22,
                                                minWidth: 22,
                                                borderRadius:
                                                    "50%",
                                                backgroundColor:
                                                    color
                                                        .value
                                                        ?.hex ||
                                                    "#e5e5e5",
                                                border:
                                                    "1px solid #ccc",
                                            }}
                                        />

                                        <Text size={1}>
                                            {
                                                color.title
                                            }
                                        </Text>
                                    </Flex>
                                </Button>
                            );
                        })}

                        {value && (
                            <Button
                                mode="ghost"
                                tone="critical"
                                padding={3}
                                onClick={() => {
                                    onChange(unset());
                                    setOpen(false);
                                }}
                            >
                                Մաքրել
                            </Button>
                        )}
                    </Stack>
                </Card>
            )}
        </Stack>
    );
}