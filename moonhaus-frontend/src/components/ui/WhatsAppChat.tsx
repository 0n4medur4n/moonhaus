import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
`;

const WhatsAppContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;

  @media (max-width: 768px) {
    bottom: 15px;
    right: 15px;
  }
`;

const WhatsAppButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
  transition: all 0.3s ease;
  animation: ${bounce} 2s infinite;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(37, 211, 102, 0.6);
  }

  svg {
    width: 32px;
    height: 32px;
    fill: white;
  }
`;

const ChatOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ChatWindow = styled(motion.div)`
  width: 100%;
  max-width: 400px;
  height: 600px;
  background: #f0f0f0;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    height: 80vh;
    max-height: 600px;
  }
`;

const ChatHeader = styled.div`
  background: #075e54;
  color: white;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #9e57ff 0%, #6139b6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
`;

const HeaderInfo = styled.div`
  flex: 1;

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
  }

  p {
    margin: 2px 0 0 0;
    font-size: 12px;
    opacity: 0.8;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #e5ddd5;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4d4d4' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
`;

const Message = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !["isBot"].includes(prop),
})<{ isBot: boolean }>`
  margin-bottom: 15px;
  display: flex;
  justify-content: ${(props) => (props.isBot ? "flex-start" : "flex-end")};
`;

const MessageBubble = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isBot"].includes(prop),
})<{ isBot: boolean }>`
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 18px;
  background: ${(props) => (props.isBot ? "#ffffff" : "#DCF8C6")};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    ${(props) => (props.isBot ? "left: -8px" : "right: -8px")};
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-top-color: ${(props) => (props.isBot ? "#ffffff" : "#DCF8C6")};
    border-bottom: 0;
    margin-bottom: -8px;
  }
`;

const MessageText = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  color: #000000;
`;

const MessageTime = styled.span`
  font-size: 11px;
  color: #666666;
  margin-top: 5px;
  display: block;
`;

const QuickReplies = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
`;

const QuickReply = styled.button`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 20px;
  padding: 8px 15px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  color: #000000;

  &:hover {
    background: #e9ecef;
  }
`;

const ChatInput = styled.div`
  padding: 15px 20px;
  background: #f0f0f0;
  border-top: 1px solid #ddd;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 25px;
  outline: none;
  font-size: 14px;
  color: #000000;

  &:focus {
    border-color: #25d366;
  }

  &::placeholder {
    color: #999999;
  }
`;

const SendButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #25d366;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: #128c7e;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
    fill: white;
  }
`;

const TypingIndicator = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 15px;
  background: white;
  border-radius: 18px;
  margin-bottom: 15px;
  max-width: 80px;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #666666;
    animation: ${keyframes`
      0%, 60%, 100% { transform: scale(1); opacity: 0.5; }
      30% { transform: scale(1.2); opacity: 1; }
    `} 1.4s infinite ease-in-out;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
`;

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  time: string;
  quickReplies?: string[];
}

const WhatsAppChat: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const whatsappNumber = "+34643927561";

  const chatFlow = [
    {
      text: t("whatsapp.welcome"),
      quickReplies: [
        t("whatsapp.options.spaces"),
        t("whatsapp.options.pricing"),
        t("whatsapp.options.visit"),
        t("whatsapp.options.other"),
      ],
    },
    {
      text: t("whatsapp.response"),
      quickReplies: [t("whatsapp.final.yes"), t("whatsapp.final.info")],
    },
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(chatFlow[0].text, chatFlow[0].quickReplies);
      }, 1000);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addBotMessage = (text: string, quickReplies?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const newMessage: Message = {
        id: Date.now(),
        text,
        isBot: true,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        quickReplies,
      };
      setMessages((prev) => [...prev, newMessage]);
    }, 1500);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      isBot: false,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleQuickReply = (reply: string) => {
    addUserMessage(reply);

    if (currentStep === 0) {
      setCurrentStep(1);
      setTimeout(() => {
        addBotMessage(chatFlow[1].text, chatFlow[1].quickReplies);
      }, 1000);
    } else {
      setTimeout(() => {
        if (reply === t("whatsapp.final.yes")) {
          addBotMessage(t("whatsapp.redirect"));
          setTimeout(() => {
            redirectToWhatsApp(t("whatsapp.defaultMessage"));
          }, 2000);
        } else {
          addBotMessage(t("whatsapp.moreInfo"));
        }
      }, 1000);
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      redirectToWhatsApp(inputValue);
    }
  };

  const redirectToWhatsApp = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(
      "+",
      ""
    )}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    setIsOpen(false);
    setMessages([]);
    setCurrentStep(0);
    setInputValue("");
  };

  return (
    <WhatsAppContainer>
      <WhatsAppButton
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386" />
        </svg>
      </WhatsAppButton>

      <AnimatePresence>
        {isOpen && (
          <ChatOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          >
            <ChatWindow
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <ChatHeader>
                <Avatar>M</Avatar>
                <HeaderInfo>
                  <h3>Moonhaus</h3>
                  <p>{t("whatsapp.online")}</p>
                </HeaderInfo>
                <CloseButton onClick={() => setIsOpen(false)}>×</CloseButton>
              </ChatHeader>

              <ChatMessages>
                {messages.map((message) => (
                  <Message
                    key={message.id}
                    isBot={message.isBot}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MessageBubble isBot={message.isBot}>
                      <MessageText>{message.text}</MessageText>
                      <MessageTime>{message.time}</MessageTime>
                      {message.quickReplies && (
                        <QuickReplies>
                          {message.quickReplies.map((reply, index) => (
                            <QuickReply
                              key={index}
                              onClick={() => handleQuickReply(reply)}
                            >
                              {reply}
                            </QuickReply>
                          ))}
                        </QuickReplies>
                      )}
                    </MessageBubble>
                  </Message>
                ))}

                {isTyping && (
                  <TypingIndicator
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </TypingIndicator>
                )}
                <div ref={messagesEndRef} />
              </ChatMessages>

              <ChatInput>
                <Input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t("whatsapp.placeholder")}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <SendButton
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z" />
                  </svg>
                </SendButton>
              </ChatInput>
            </ChatWindow>
          </ChatOverlay>
        )}
      </AnimatePresence>
    </WhatsAppContainer>
  );
};

export default WhatsAppChat;
