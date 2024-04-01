import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Braces } from 'lucide-react'
import { Button } from './custom/button'
import { Textarea } from './ui/textarea'
import { useState } from 'react'

export function UserNav() {
  const [token, setToken] = useState("")
  const handleSubmit = () => {
    localStorage.setItem('token', token)
    window.location.reload()
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='icon' variant='ghost' className='rounded-full'>
          <Braces size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add Token</DialogTitle>
          <DialogDescription>
            Please Add Auth token. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='name'>Token</Label>
            <Textarea
              id='token'
              className='col-span-3'
              onChange={(e)=>{
                setToken(e.target.value)
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit' onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
