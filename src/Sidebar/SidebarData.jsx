import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import TranslateIcon from '@mui/icons-material/Translate';
import MicIcon from '@mui/icons-material/Mic';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import KeyboardIcon from '@mui/icons-material/Keyboard';
export const SidebarData =[
   {
      title:'Typing Master',
      icon:<KeyboardIcon sx={{ fontSize: 28 }}/>,
      path:"/Firsttyping"
     },
   
     {
        title:'Language Translator',
      icon:<TranslateIcon sx={{ fontSize: 28 }}/>,
      path:"/Translator"
   },
   {
    title:'Voice Recognization',
    icon:<MicIcon sx={{ fontSize: 28 }}/>,
    path:"/Voicetyper"
   },
   {
      title:'Summarize Text',
      icon:<SummarizeIcon sx={{ fontSize: 28 }}/>,
      path:"/TextSummary"
     },{
        title:'PDF To Audio',
        icon:<VolumeUpIcon sx={{ fontSize: 28 }}/>,
        path:"/Pdftospeech"
     },
     
     {
        title:'Bill Generator',
        icon:<AccountBalanceWalletIcon sx={{ fontSize: 28 }}/>,
        path:"/BillGenerator"
  
     },
]