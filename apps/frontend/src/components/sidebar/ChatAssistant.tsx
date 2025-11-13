import { FormEvent, useEffect, useRef, useState } from "react";
import { usePatients } from "../../context/PatientsContext";
import { formatPhone } from "../../utils/formatters";

export function ChatAssistant() {
  const {
    chatMessages,
    addChatMessage,
    registerSupportPhone,
    supportPhone,
  } = usePatients();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [chatMessages]);

  const handleSubmit = (event?: FormEvent) => {
    event?.preventDefault();
    if (!input.trim()) return;

    addChatMessage("user", input.trim());
    registerSupportPhone(input.trim());
    setInput("");
  };

  return (
    <section className="flex h-full flex-col rounded-3xl border border-white/60 bg-white/90 p-5 shadow-xl">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-marine">
            Assistente inteligente
          </p>
          <h3 className="text-lg font-semibold text-brand-dark">Chat</h3>
        </div>
        <div className="text-right text-xs text-brand-marine/80">
          {supportPhone ? "WhatsApp confirmado" : "Aguardando celular"}
          <div className="text-[10px] font-semibold text-green-500">● ativo</div>
        </div>
      </header>

      <div
        ref={scrollRef}
        className="mt-4 flex-1 space-y-3 overflow-y-auto rounded-2xl bg-brand-sand/80 p-3 text-sm"
      >
        {chatMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.author === "assistant" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.author === "assistant"
                  ? "bg-white text-brand-dark"
                  : "bg-brand-marine text-white"
              }`}
            >
              <p>{message.text}</p>
              <span className="mt-1 block text-[10px] opacity-70">
                {new Date(message.timestamp).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          type="tel"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Seu WhatsApp (ex.: 11999998888)"
          className="flex-1 rounded-2xl border border-brand-mist/70 bg-white px-4 py-3 text-sm focus:border-brand-marine focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-2xl bg-brand-marine px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand-sky"
        >
          {supportPhone ? "Atualizar" : "Enviar"}
        </button>
      </form>

      {supportPhone && (
        <p className="mt-3 text-xs text-brand-marine/80">
          Número ativo: {formatPhone(supportPhone)}
        </p>
      )}
    </section>
  );
}

