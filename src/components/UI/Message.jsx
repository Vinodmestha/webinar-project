const messageStyles =
    "max-w-screen-xl mx-auto flex flex-col items-center justify-center text-base font-medium tracking-widest opacity-900 z-[9999]";

const boxStyles =
    "content-box flex justify-center translate-x-0 px-2 py-2 my-1 rounded-lg transition-all duration-300 min-w-[150px]";

const infoMessage = "text-white bg-[#1890ff]";
const successMessage = "text-white bg-[#52c41a]";
const warnMessage = "text-white bg-[#faad14]";
const errorMessage = "text-white bg-[#f5222d]";

function Message() {
    // const dom = document?.createElement("div");
    // dom.className = messageStyles;
    // window.onload = () => document.body.appendChild(dom);
}

const typeHandler = (type) => {
    switch (type) {
        case "info":
            return infoMessage;
        case "success":
            return successMessage;
        case "warn":
            return warnMessage;
        case "error":
            return errorMessage;
        default:
            return infoMessage;
    }
};

Message.prototype.show = function (
    content,
    duration = 4000,
    type = "info",
    onClose = Function.prototype
) {
    const contentBox = document.createElement("div");
    const contentText = document.createElement("span");
    const dom = document?.createElement("div");
    dom.className = messageStyles;
    window.onload = () => document.body.appendChild(dom);

    contentText.innerText = content;
    contentBox.className = `${boxStyles} ${typeHandler(type)}`;
    contentBox.classList.add("animate-rwc-msg-in");
    // contentBox.appendChild(icon);
    contentBox.appendChild(contentText);
    contentBox.style.top = `${this.count * 42}px`;
    dom.appendChild(contentBox);

    this.count++;

    // remove message box after duration
    setTimeout(() => {
        contentBox.classList.add("animate-rwc-msg-out");
        setTimeout(() => {
            dom.removeChild(contentBox);

            const boxes = document.querySelectorAll(".content-box");
            for (let i = 0; i < boxes.length; i++) {
                boxes[i].style.top = `${
                    parseInt(boxes[i].style.top, 10) - 50
                }px`;
            }
            this.count--;

            if (typeof onClose === "function") onClose();
        }, 300);
    }, duration);
};

// API
["info", "success", "warn", "error"].map((method) => {
    return (Message.prototype[method] = function (content, duration, onClose) {
        this.show(content, duration, method, onClose);
    });
});

// the count of messages already exist
Message.prototype.count = 0;

export default new Message();

// const icon = document.createElement("i");
// icon.classList.add(type);
// icon.classList.add("message-icon");
