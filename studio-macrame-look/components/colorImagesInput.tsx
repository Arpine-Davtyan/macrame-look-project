"use client";

import React, { useRef, useState } from "react";
import { ArrayOfObjectsInputProps, set, useClient } from "sanity";
import { Button, Card, Flex, Stack, Text, Spinner } from "@sanity/ui";

export function ColorImagesInput(
    props: ArrayOfObjectsInputProps
) {
    const {
        value = [],
        onChange,
        renderDefault,
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    const client = useClient({ apiVersion: "2026-01-01" });
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = event.target.files;

        if (!files || files.length === 0) {
            return;
        }

        const selectedFiles = Array.from(files);

        try {
            setUploading(true);
            setUploadProgress(0);

            const uploadedImages = [];

            for (
                let index = 0;
                index < selectedFiles.length;
                index++
            ) {
                const file = selectedFiles[index];

                const asset =
                    await client.assets.upload(
                        "image",
                        file,
                        { filename: file.name }
                    );

                uploadedImages.push({
                    _type: "image",
                    _key: crypto.randomUUID(),

                    asset: {
                        _type: "reference",
                        _ref: asset._id,
                    },
                });

                setUploadProgress(
                    Math.round(((index + 1) / selectedFiles.length) * 100)
                );
            }

            onChange(
                set([
                    ...value,
                    ...uploadedImages,
                ])
            );
        } catch (error) {
            console.error(
                "Image upload failed:",
                error
            );
        } finally {
            setUploading(false);
            setUploadProgress(0);

            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }
    };

    const openFilePicker = () => {
        if (!uploading) {
            inputRef.current?.click();
        }
    };

    return (
        <Stack space={3}>
            <Card
                padding={3}
                border
                radius={2}
            >
                <Stack space={3}>
                    <Flex
                        align="center"
                        justify="flex-end"
                        gap={3}
                    >

                        <Button
                            text={
                                uploading
                                    ? `Բեռնում... ${uploadProgress}%`
                                    : "Ավելացնել նկարներ"
                            }
                            mode="default"
                            tone="primary"
                            disabled={uploading}
                            onClick={openFilePicker}
                        />
                    </Flex>

                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleUpload}
                        style={{ display: "none" }}
                    />

                    {uploading && (
                        <Stack space={2}>
                            <Flex
                                align="center"
                                gap={2}
                            >
                                <Spinner />

                                <Text size={1}>
                                    Նկարների բեռնում...
                                </Text>
                            </Flex>

                            <div
                                style={{
                                    width: "100%",
                                    height: 4,
                                    background: "#e5e5e5",
                                    borderRadius: 4,
                                    overflow: "hidden",
                                }}
                            >
                                <div
                                    style={{
                                        width: `${uploadProgress}%`,
                                        height: "100%",
                                        background: "#ab8a1c",
                                        transition: "width 0.2s ease",
                                    }}
                                />
                            </div>

                            <Text
                                size={1}
                                muted
                            >
                                {uploadProgress}%
                            </Text>
                        </Stack>
                    )}
                </Stack>
            </Card>

            {renderDefault(props)}
        </Stack>
    );
}