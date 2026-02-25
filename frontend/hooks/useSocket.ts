import { useEffect, useRef, useState } from "react";
import {io, Socket} from 'socket.io-client';
import { Message } from "@/app/conversation/schema/chat.schema";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5050';

export const useSocket = (token: string | null) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected ] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        if(!token) {
            if(socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
                setSocket(null);
                setIsConnected(false);
            }
            return;
        }

        // create socket conection
        const newSocket = io(SOCKET_URL, {
            auth: { token },
            transports: ['websocket', 'poiling'],
        });

        socketRef.current = newSocket;
        setSocket(newSocket);
        
        // connnection events
        newSocket.on('connect',() => {
            console.log('Socket connected');
            setIsConnected(true);

            // get online users
            newSocket.emit('get_online_users', (users: string[]) => {
                setOnlineUsers(users);
            });
        });

        newSocket.on('disconnect', () => {
            console.log('Socket disconnected');
            setIsConnected(false);
        });
        newSocket.on('connect_error', (error) => {
            console.error('Socket connection error: ', error);
            setIsConnected(false);
        });
        newSocket.on('user_online', ({userId}:{userId: string}) => {
            setOnlineUsers((prev) => [...new Set([...prev, userId])]);
        });

        newSocket.on('user_offline', ({userId}: {userId: string}) => {
            setOnlineUsers((prev) => prev.filter((id) => id !== userId));
        });

        return () => {
            newSocket.disconnect();
            socketRef.current = null;
        }
    }, [token]);

    const sendMesage = (
        conversationId: string,
        text: string,
        callback?: (response: { success: boolean; message?: Message; error?: string}) => void ) => {
            if(socket && isConnected) {
                socket.emit('send_message', { conversationId, text}, callback);
            }
        };

        const markAsRead = (conversationId: string) => {
            if (socket && isConnected) {
                socket.emit('mark_as_read', {conversationId});
            }
        };

        const emitTyping = (conversationId: string, receiverId: string) => {
            if (socket && isConnected) {
                socket.emit('typing', {conversationId, receiverId});
            }
        };

        const emitStopTyping = (conversationId: string, receiverId: string) => {
            if (socket && isConnected) {
                socket.emit('stop_typing', {conversationId, receiverId});
            }

        };

        const isUserOnline = (userId: string) => {
            return onlineUsers.includes(userId);
        };

    return {
        socket,
        isConnected,
        onlineUsers,
        sendMesage,
        markAsRead,
        emitTyping,
        emitStopTyping,
        isUserOnline,

    }
    
}