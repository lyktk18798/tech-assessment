import React, { useEffect, useState } from "react";
import "./ShortenUrl.css";
import { Typography } from "antd";
import { Button, Input, Tag, notification } from "antd";
import {shortenURL} from "../../apis/request";

const { Title, Paragraph, Text } = Typography;

export function ShortenUrl() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (success = true) => {
    if (success) {
      api.success({
        message: "Get Shortened URL Successfully",
        description: "The Shortened URL is generated, please copy the link",
        duration: 3,
        style: {
          width: 600,
        },
      });
    } else {
      api.error({
        message: "Get Shortened URL Failed",
        description: "Get Shortened URL failed, please try again",
        duration: 3,
        style: {
          width: 600,
        },
      });
    }
  };
  const onInputChange = (e: string): void => setLongUrl(e);
  const validateInput = (input: string): void => {
    try {
      new URL(input);
      setValid(true);
    } catch (error) {
      setValid(false);
    }
  };
  const onCreateLinkClick = async (): Promise<void> => {
    setLoading(true);
    await shortenURL(longUrl)
      .then(data => {
        setShortUrl(`${process.env.REACT_APP_API_ENDPOINT}/${data}`);
        openNotification(true);
      }).catch((err) => {
          setShortUrl(err.message);
          openNotification(false)
      })
        .finally(() => setLoading(false));
  };

  useEffect(() => {
    validateInput(longUrl);
  }, [longUrl]);

  return (
    <div className="input-section">
      {contextHolder}
      <Title>Shorten your URL</Title>
      <Paragraph>Paste your URL to the input below and click <strong>Create a link</strong></Paragraph>
      <div className="input-box">
        <Input
          onChange={(e) => onInputChange(e.target.value)}
          disabled={loading}
          placeholder="Input here!"
          className="field"
          data-testid="input"
        />
        <Button
          loading={loading}
          disabled={!valid}
          onClick={async () => {
            await onCreateLinkClick();
          }}
          type="primary"
          className="button"
          data-testid="button"
        >
          Create a link
        </Button>
      </div>
      {shortUrl &&
      <Tag className="tag" color="cyan">
         <Text copyable>{shortUrl}</Text>
      </Tag>}
    </div>
  );
}
