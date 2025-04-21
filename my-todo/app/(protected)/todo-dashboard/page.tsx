
import { currentUser } from '@/lib/authentication';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import UpdateProfileForm from '@/components/auth/update-profile-form';
import UpdatePasswordForm from '@/components/auth/update-password-form';
import TaskList from '@/components/todo-dashboard/task-form/task-list';

export default async function TodoPage() {
  const user = await currentUser();

  return (
    <>
      <Card className='w-full'>
        <CardContent>
          <TaskList />
        </CardContent>
      </Card>
      {user?.isOAuth === false && (
        <Card className='w-full mt-6'>
          <CardHeader>
            <h3 className='font-semibold'>Update Password</h3>
          </CardHeader>
          <CardContent>
            <UpdatePasswordForm />
          </CardContent>
        </Card>
      )}
    </>
  );
}
