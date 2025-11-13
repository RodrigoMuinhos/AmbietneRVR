import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { usePatients } from "../../context/PatientsContext";
import { formatPhone } from "../../utils/formatters";
export function ChatAssistant() {
    const { chatMessages, addChatMessage, registerSupportPhone, supportPhone, } = usePatients();
    const [input, setInput] = useState("");
    const scrollRef = useRef(null);
    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [chatMessages]);
    const handleSubmit = (event) => {
        event?.preventDefault();
        if (!input.trim())
            return;
        addChatMessage("user", input.trim());
        registerSupportPhone(input.trim());
        setInput("");
    };
    return (_jsxs("section", { className: "flex h-full flex-col rounded-3xl border border-white/60 bg-white/90 p-5 shadow-xl", children: [_jsxs("header", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-brand-marine", children: "Assistente inteligente" }), _jsx("h3", { className: "text-lg font-semibold text-brand-dark", children: "Chat" })] }), _jsxs("div", { className: "text-right text-xs text-brand-marine/80", children: [supportPhone ? "WhatsApp confirmado" : "Aguardando celular", _jsx("div", { className: "text-[10px] font-semibold text-green-500", children: "\u25CF ativo" })] })] }), _jsx("div", { ref: scrollRef, className: "mt-4 flex-1 space-y-3 overflow-y-auto rounded-2xl bg-brand-sand/80 p-3 text-sm", children: chatMessages.map((message) => (_jsx("div", { className: `flex ${message.author === "assistant" ? "justify-start" : "justify-end"}`, children: _jsxs("div", { className: `max-w-[80%] rounded-2xl px-4 py-2 ${message.author === "assistant"
                            ? "bg-white text-brand-dark"
                            : "bg-brand-marine text-white"}`, children: [_jsx("p", { children: message.text }), _jsx("span", { className: "mt-1 block text-[10px] opacity-70", children: new Date(message.timestamp).toLocaleTimeString("pt-BR", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                }) })] }) }, message.id))) }), _jsxs("form", { onSubmit: handleSubmit, className: "mt-4 flex gap-2", children: [_jsx("input", { type: "tel", value: input, onChange: (event) => setInput(event.target.value), placeholder: "Seu WhatsApp (ex.: 11999998888)", className: "flex-1 rounded-2xl border border-brand-mist/70 bg-white px-4 py-3 text-sm focus:border-brand-marine focus:outline-none" }), _jsx("button", { type: "submit", className: "rounded-2xl bg-brand-marine px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand-sky", children: supportPhone ? "Atualizar" : "Enviar" })] }), supportPhone && (_jsxs("p", { className: "mt-3 text-xs text-brand-marine/80", children: ["N\u00FAmero ativo: ", formatPhone(supportPhone)] }))] }));
}
