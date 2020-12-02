import nodemailer from 'nodemailer'

const emailer = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    service: "gmail",
    auth: {
        user: "vasilets.seven@gmail.com",
        pass: "hft4150tbc4101f"
    }
})

export const sendingEmail = (email: string): any => {
    let emailOptions = {
        from: "vasilets.seven@gmail.com",
        to: email,
        subject: "// Subject line",
        text: "http//:localhost"
    }

    emailer.sendMail(emailOptions, (error: any, info: any) => {
        if (error) {
            return error
        }

        return true
    })
}