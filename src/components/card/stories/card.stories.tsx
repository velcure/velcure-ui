import { Button, ButtonGroup } from '#/components/button/src';
import { FormControl, FormLabel } from '#/components/form-control/src';
import { Input } from '#/components/input/src';
import { Typography } from '#/components/typography/src';
import { Meta } from '@storybook/react';
import { Card, CardBody, CardFooter, CardHeader } from '../src';

const meta = {
  title: 'Components / Data Display / Card',
  component: Card,

  decorators: [
    (story) => <div className="max-w-sm w-full mx-auto">{story()}</div>,
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;

export const Basic = () => (
  <Card>
    <CardBody>
      <Typography variant="h4" className="mb-2">
        UI/UX Review Check
      </Typography>
      <Typography>
        The place is close to Barceloneta Beach and bus stop just 2 min by walk
        and near to &quot;Naviglio&quot; where you can enjoy the main night life
        in Barcelona.
      </Typography>
    </CardBody>
    <CardFooter>
      <Button>Read more</Button>
    </CardFooter>
  </Card>
);

export const WithDivider = () => (
  <Card className="w-full">
    <CardHeader>
      <Typography variant="h4">UI/UX Review Check</Typography>
    </CardHeader>
    <CardBody>
      <div className="flex flex-col gap-4 divide-y">
        <div className="pb-2">
          <Typography variant="h6" className="uppercase">
            Summary
          </Typography>
          <Typography>
            The place is close to Barceloneta Beach and bus stop just 2 min by
          </Typography>
        </div>
        <div className="py-2">
          <Typography variant="h6" className="uppercase">
            Overview
          </Typography>
          <Typography>
            The place is close to Barceloneta Beach and bus stop just 2 min by
          </Typography>
        </div>
        <div className="py-2">
          <Typography variant="h6" className="uppercase">
            Analysis
          </Typography>
          <Typography>
            The place is close to Barceloneta Beach and bus stop just 2 min by
          </Typography>
        </div>
      </div>
    </CardBody>
  </Card>
);

export const Form = () => (
  <Card>
    <CardHeader>
      <Typography variant="h4">Profile</Typography>
    </CardHeader>
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <CardBody className="space-y-4">
        <FormControl>
          <FormLabel>FirstName</FormLabel>
          <Input name="firstName" />
        </FormControl>
        <FormControl>
          <FormLabel>LastName</FormLabel>
          <Input name="lastName" />
        </FormControl>
      </CardBody>
      <CardFooter className="flex justify-end">
        <ButtonGroup>
          <Button variant="secondary" type="reset">
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </ButtonGroup>
      </CardFooter>
    </form>
  </Card>
);
