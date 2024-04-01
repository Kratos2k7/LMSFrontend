import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import moment from 'moment'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/custom/button'
export default function Drawers({
  drawer,
  setDrawer,
  handleEditComment,
  drawerData,
  comment,
  handleCommentDelete,
  commentEditModal,
  setCommentEditModal,
  handleCommentChange,
  handleCommentSave,
  onSubmit,
  handleFileChange,
  loading,
}: any) {
  return (
    <>
      <Sheet open={drawer} onOpenChange={setDrawer}>
        <SheetContent className='w-[900px] !max-w-[900px] sm:w-[6000px]'>
          <SheetHeader>
            <SheetTitle>View Details</SheetTitle>
          </SheetHeader>
          <div className='grid gap-4 py-4'>
            <Tabs defaultValue='comments' className='w-full'>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='comments'>Comments</TabsTrigger>
                <TabsTrigger value='fileUpload'>File Upload</TabsTrigger>
              </TabsList>
              <TabsContent value='comments'>
                <Card>
                  <div className='grid grid-cols-2'>
                    <div>
                      <CardHeader>
                        <CardTitle>Comments</CardTitle>
                        <CardDescription>
                          All the Comments are listed below.
                        </CardDescription>
                      </CardHeader>
                    </div>
                    <div>
                      <CardHeader className='float-right'>
                        <Button
                          className='w-auto'
                          onClick={() => handleEditComment('', false)}
                        >
                          Add Comment
                        </Button>
                      </CardHeader>
                    </div>
                  </div>
                  <CardContent className='space-y-2'>
                    <ScrollArea className='h-auto'>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Comment id</TableHead>
                            <TableHead>Comment</TableHead>
                            <TableHead>Author Name</TableHead>
                            <TableHead>Created at</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {drawerData?.submission_comments?.map(
                            (comments: any) => {
                              return (
                                <TableRow key={comments?.id}>
                                  <TableCell className='font-medium'>
                                    {comments?.id}
                                  </TableCell>
                                  <TableCell>
                                    {comments?.attachments &&
                                    comments?.attachments?.length > 0 ? (
                                      <a
                                        href={comments?.attachments[0].url}
                                        rel='noreferrer'
                                        className='underline'
                                        target='_blank'
                                      >
                                        {comments?.attachments[0].display_name}
                                      </a>
                                    ) : (
                                      comments?.comment
                                    )}
                                  </TableCell>
                                  <TableCell>{comments?.author_name}</TableCell>
                                  <TableCell>
                                    {moment(comments?.created_at).format('LTS')}
                                  </TableCell>
                                  <TableCell>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          variant='ghost'
                                          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
                                        >
                                          <DotsHorizontalIcon className='h-4 w-4' />
                                          <span className='sr-only'>
                                            Open menu
                                          </span>
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent
                                        align='end'
                                        className='w-[160px]'
                                      >
                                        {comments?.attachments &&
                                        comments?.attachments?.length >
                                          0 ? null : (
                                          <DropdownMenuItem
                                            onClick={() =>
                                              handleEditComment(comments, true)
                                            }
                                          >
                                            Edit
                                          </DropdownMenuItem>
                                        )}
                                        <DropdownMenuItem
                                          onClick={() =>
                                            handleCommentDelete(comments)
                                          }
                                        >
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              )
                            }
                          )}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value='fileUpload'>
                <Card>
                  <CardHeader>
                    <CardTitle>Upload a file</CardTitle>
                    <CardDescription>
                      You can upload a file here. Click save when you're done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='grid w-full max-w-full items-center gap-1.5'>
                      <Label htmlFor='file'>File</Label>
                      <Input
                        id='file'
                        type='file'
                        className='cursor-pointer file:text-muted-foreground'
                        onChange={handleFileChange}
                      />
                    </div>
                    <Button
                      type='submit'
                      loading={loading?.fileLoaders}
                      onClick={onSubmit}
                    >
                      Submit
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>
      <Dialog open={commentEditModal} onOpenChange={setCommentEditModal}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Edit Comment</DialogTitle>
            <DialogDescription>
              Make changes to your Comment here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='comment' className='text-right'>
                Comment
              </Label>
              <Input
                id='comment'
                name='comment'
                value={comment}
                className='col-span-3'
                onChange={handleCommentChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type='submit'
              onClick={handleCommentSave}
              loading={loading?.commentSave}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
