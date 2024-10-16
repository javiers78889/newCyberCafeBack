import { Sender } from "../middleware/sender"

export const sendMessage = async (req,res) => {
    Sender(req.body)
}