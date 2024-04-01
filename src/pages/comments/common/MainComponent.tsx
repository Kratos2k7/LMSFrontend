import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CircleMinus, CirclePlus } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import _ from 'lodash'
import { getStatusText } from '@/Constant/Utilities'

type Props = {
  data: any
  paramsRow: any
  handleparamsChange: any
  HandleAddRow: any
  handleRowDelete: any
  handleheadersChange: any
  headersRow: any
  HandleheadersAddRow: any
  handleheadersRowDelete: any
  BodyRow: any
  handleBodyChange: any
  HandleBodyAddRow: any
  handleBodyRowDelete: any
  handleRequestChange: any
  handleURLChange: any
  onSubmit: any
  values: any
  response: any
  errors: any
  handleBodyTypeChange: any
  bodyType: any
}

function MainComponent({
  data,
  paramsRow,
  handleparamsChange,
  HandleAddRow,
  handleRowDelete,
  handleheadersChange,
  headersRow,
  HandleheadersAddRow,
  handleheadersRowDelete,
  BodyRow,
  handleBodyChange,
  HandleBodyAddRow,
  handleBodyRowDelete,
  handleRequestChange,
  handleURLChange,
  onSubmit,
  values,
  response,
  errors,
  handleBodyTypeChange,
  bodyType,
}: Props) {
  return (
    <div>
      <div className='flex w-full max-w-full items-center space-x-2'>
        <Select
          defaultValue={data.requestValue}
          onValueChange={handleRequestChange}
          value={values.requestValue}
        >
          <SelectTrigger className='w-[100px]'>
            <SelectValue placeholder='Select a Value' />
          </SelectTrigger>
          <SelectContent defaultValue={data.requestValue}>
            <SelectGroup>
              <SelectItem value='GET'>GET</SelectItem>
              <SelectItem value='POST'>POST</SelectItem>
              <SelectItem value='PUT'>PUT</SelectItem>
              <SelectItem value='DELETE'>DELETE</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          type='url'
          placeholder='URL'
          inputMode='url'
          onChange={handleURLChange}
          value={values.url}
        />
        <Button type='submit' onClick={onSubmit}>
          Send
        </Button>
      </div>
      <div className='mt-5 flex w-full max-w-full items-center'>
        <Tabs defaultValue='params' className='w-full'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='params'>Params</TabsTrigger>
            <TabsTrigger value='headers'>Headers</TabsTrigger>
            <TabsTrigger value='body'>Body</TabsTrigger>
          </TabsList>
          <TabsContent value='params'>
            <Card>
              <CardHeader>
                <CardTitle>Query Params</CardTitle>
              </CardHeader>
              <CardContent className='space-y-2'>
                <div className='space-y-1'>
                  {paramsRow?.map((row: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className='grid w-full grid-cols-5 items-center gap-1.5'
                      >
                        <div className='col-span-2 space-y-2'>
                          <Label htmlFor='key'>Key</Label>
                          <Input
                            type='key'
                            id='key'
                            name='key'
                            value={row.key}
                            placeholder='key'
                            onChange={(e) => handleparamsChange(index, e)}
                          />
                        </div>
                        <div className='col-span-2 space-y-2'>
                          <Label htmlFor='value'>Value</Label>
                          <Input
                            type='value'
                            id='value'
                            name='value'
                            value={row.value}
                            placeholder='value'
                            onChange={(e) => handleparamsChange(index, e)}
                          />
                        </div>
                        <div className='col-span-1 text-center'>
                          <center>
                            <CircleMinus
                              className='mt-8 cursor-pointer'
                              onClick={() => handleRowDelete(index)}
                            />
                          </center>
                        </div>
                      </div>
                    )
                  })}
                  <div className='grid w-full items-center gap-1.5 '>
                    <div
                      className='mt-4 flex cursor-pointer items-center'
                      onClick={HandleAddRow}
                    >
                      <span>
                        <CirclePlus />
                      </span>
                      <span className='ml-2'>Add a Param Row</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='headers'>
            <Card>
              <CardHeader>
                <CardTitle>Headers</CardTitle>
              </CardHeader>
              <CardContent className='space-y-2'>
                <div className='space-y-1'>
                  {headersRow?.map((row: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className='grid w-full grid-cols-5 items-center gap-1.5'
                      >
                        <div className='col-span-2 space-y-2'>
                          <Label htmlFor='key'>Key</Label>
                          <Input
                            type='key'
                            id='key'
                            name='key'
                            value={row.key}
                            placeholder='key'
                            onChange={(e) => handleheadersChange(index, e)}
                          />
                        </div>
                        <div className='col-span-2 space-y-2'>
                          <Label htmlFor='value'>Value</Label>
                          <Input
                            type='value'
                            id='value'
                            name='value'
                            value={row.value}
                            placeholder='value'
                            onChange={(e) => handleheadersChange(index, e)}
                          />
                        </div>
                        <div className='col-span-1 text-center'>
                          <center>
                            <CircleMinus
                              className='mt-8 cursor-pointer'
                              onClick={() => handleheadersRowDelete(index)}
                            />
                          </center>
                        </div>
                      </div>
                    )
                  })}
                  <div className='grid w-full items-center gap-1.5 '>
                    <div
                      className='mt-4 flex cursor-pointer items-center'
                      onClick={HandleheadersAddRow}
                    >
                      <span>
                        <CirclePlus />
                      </span>
                      <span className='ml-2'>Add a Headers Row</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='body'>
            <Card>
              <CardHeader>
                <CardTitle>Form Body</CardTitle>
              </CardHeader>
              <CardContent className='space-y-2'>
                <div className='space-y-1'>
                  {BodyRow?.map((row: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className='grid w-full grid-cols-5 items-center gap-1.5'
                      >
                        <div className='col-span-2 flex '>
                          <div className='inline'>
                            <Label htmlFor='key'>Key</Label>
                            <Input
                              type='key'
                              id='key'
                              name='key'
                              value={row.key}
                              placeholder='key'
                              className='w-[500px]'
                              onChange={(e) => handleBodyChange(index, e)}
                            />
                          </div>
                          <div className='space-x-2'>
                            <Label htmlFor='keyType'> &nbsp; </Label>
                            <Select
                              name='keyType'
                              defaultValue='text'
                              value={bodyType}
                              onValueChange={handleBodyTypeChange}
                            >
                              <SelectTrigger className='w-[85px]'>
                                <SelectValue placeholder='Select a Type' />
                              </SelectTrigger>
                              <SelectContent defaultValue='text'>
                                <SelectGroup>
                                  <SelectItem value='text'>Text</SelectItem>
                                  <SelectItem value='file'>File</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className='col-span-2 '>
                          <Label htmlFor='value'>Value</Label>
                          {bodyType === 'text' ? (
                            <Input
                              type='text'
                              id='value'
                              name='value'
                              value={row.value}
                              placeholder='value'
                              onChange={(e) => handleBodyChange(index, e)}
                            />
                          ) : (
                            <Input
                              type='file'
                              id='value'
                              name='value'
                              className='cursor-pointer file:text-muted-foreground'
                              placeholder='value'
                              onChange={(e) => handleBodyChange(index, e)}
                            />
                          )}
                        </div>
                        <div className='col-span-1 text-center'>
                          <center>
                            <CircleMinus
                              className='mt-5 cursor-pointer'
                              onClick={() => handleBodyRowDelete(index)}
                            />
                          </center>
                        </div>
                      </div>
                    )
                  })}
                  <div className='grid w-full items-center gap-1.5 '>
                    <div
                      className='mt-4 flex cursor-pointer items-center'
                      onClick={HandleBodyAddRow}
                    >
                      <span>
                        <CirclePlus />
                      </span>
                      <span className='ml-2'>Add a Body Row</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className='mt-5'>
        {!_.isEmpty(response) ? (
          <Card>
            <div className='grid grid-cols-2'>
              <div>
                <CardHeader>
                  <CardTitle>Response</CardTitle>
                </CardHeader>
              </div>
              {!_.isEmpty(response) && (
                <div>
                  <CardHeader className='float-right'>
                    <CardTitle>
                      Time:{' '}
                      <span className='text-green-400'>
                        {response?.responseTime + ' ms'}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardHeader className='float-right'>
                    <CardTitle>
                      Status:{' '}
                      <span className='text-green-400'>
                        {response?.status +
                          ' ' +
                          getStatusText(response?.status)}
                      </span>
                    </CardTitle>
                  </CardHeader>
                </div>
              )}
            </div>
            <ScrollArea className='h-72 w-full rounded-md '>
              <CardContent>
                <pre>{JSON.stringify(response?.data, null, 2)}</pre>
              </CardContent>
            </ScrollArea>
          </Card>
        ) : (
          <Card>
            <div className='grid grid-cols-2'>
              <div>
                <CardHeader>
                  <CardTitle>Response</CardTitle>
                </CardHeader>
              </div>
              {!_.isEmpty(errors) && (
                <div>
                  <CardHeader className='float-right'>
                    <CardTitle>
                      Status:{' '}
                      <span className='text-red-400'>
                        {' '}
                        {errors?.response?.status +
                          ' ' +
                          getStatusText(errors?.response?.status)}
                      </span>
                    </CardTitle>
                  </CardHeader>
                </div>
              )}
            </div>
            <ScrollArea className='h-72 w-full rounded-md '>
              <CardContent>
                <pre>{JSON.stringify(errors?.message, null, 2)}</pre>
              </CardContent>
            </ScrollArea>
          </Card>
        )}
      </div>
    </div>
  )
}

export default MainComponent
