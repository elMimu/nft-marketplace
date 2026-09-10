import { Server } from "socket.io";

const PORT = 3001;

const io = new Server(PORT, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Socket client connected:", socket.id);

  const priceTimeout = setTimeout(() => {
    socket.emit("nft.updated", {
      index: 0,
      priceEth: "9.99",
    });

    console.log("Updated first NFT price");
  }, 5000);

  const imageTimeout = setTimeout(() => {
    socket.emit("nft.updated", {
      index: 1,
      imageUrl: "/images/sage-nomad.png",
    });

    console.log("Updated second NFT image");
  }, 10000);

  socket.on("order.created", ({ id }) => {
    console.log("Order created:", id);

    setTimeout(() => {
      io.emit("order.updated", {
        id,
        status: "confirmed",
      });

      console.log("Order confirmed:", id);
    }, 3000);
  });

  socket.on("disconnect", () => {
    clearTimeout(priceTimeout);
    clearTimeout(imageTimeout);

    console.log("Socket client disconnected");
  });
});

console.log(`Mock Socket.IO server running on http://localhost:${PORT}`);
