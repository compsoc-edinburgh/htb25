import { Card, CardContent } from "../../ui/card";
import ArrowSVG from "./arrows-animated";
import MailingListForm from "./mailing-list-form";


const MailingListInfoCard = () => {
    return (
        <Card className="border-0 bg-[#FAD2A0]">
            <CardContent className="font-tekstur text-[#F0563C] text-xl md:text-2xl lg:text-3xl font-semibold text-left p-8">
                Join our mailing list to stay up to date on the hackathon!
            </CardContent>
        </Card>
    )
}

const ArrowsCard = ({ arrowColor = 'white', cardColor = '#2A4FEE' }) => {
    return (
        <Card className={`border-0 bg-[${cardColor}] flex-1 overflow-hidden`}>
            <CardContent className="font-tekstur p-3 flex gap-4">
                <ArrowSVG arrowColor={arrowColor}></ArrowSVG>
            </CardContent>
        </Card>
    )
}

const MailingListInputCard = () => {

    return (
        <Card className="border-0 bg-white w-full h-full items-center">
            <CardContent className="flex items-center justify-center gap-2 p-5 w-full h-full">
                <MailingListForm />
            </CardContent>
        </Card>
    )
}

export const MailingListCards = {
    MailingListInfoCard,
    ArrowsCard,
    MailingListInputCard
  } as const;