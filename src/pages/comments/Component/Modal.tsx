import { Button } from '@/components/custom/button'
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Modals({
  modal,
  setModal,
  handleChange,
  handleSubmit,
  loading,
}: any) {
  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Configure Ids</DialogTitle>
          <DialogDescription>
            Assign ids to get Submissions. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid w-full items-center gap-4'>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>Course Id</Label>
            <Input
              id='courseId'
              name='courseId'
              type='text'
              onChange={handleChange}
              className='col-span-3'
            />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='username'>Assignment Id</Label>
            <Input
              id='AssignmentId'
              name='assignmentId'
              type='text'
              onChange={handleChange}
              className='col-span-3'
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            loading={loading?.idAssignLoader}
            type='submit'
            onClick={handleSubmit}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
