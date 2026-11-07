import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm';
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import { deleteGoal, getGoals, reset, updateGoal } from '../features/goals/goalSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth);
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals)

  useEffect(() => {                     // Fetch goals when authenticated
    if (!user) {
      navigate('/login')
      return
    }

    dispatch(getGoals())

    return () => {          // cleanup func --> runs when dashboard unmounts, & resets the goals in redux store as well.
      dispatch(reset())
    }
  }, [user, navigate, dispatch])
  useEffect(() => {                     // Handle errors separately
    if (isError) {
      toast.error(message)
    }
  }, [isError, message])

  const handleDelete = async (goalId) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await dispatch(deleteGoal(goalId)).unwrap();
        toast.success('Goal deleted successfully! 🗑️');
      } catch (error) {
        toast.error(error || 'Failed to delete goal');
      }
    }
  }

  const handleUpdate = async (goalId, currentGoal) => {
    const updatedGoal = window.prompt(
        'Update your goal:',
        currentGoal
    );
    if (updatedGoal === null || updatedGoal.trim() === '') {
        return;
    }

    try {
        await dispatch(updateGoal({
            goalId,
            goalData: { newGoal: updatedGoal.trim() }
        })).unwrap();
        toast.success('Goal updated successfully! ✨');
    } catch (error) {
        toast.error(error || 'Failed to update goal');
    }
  };

  if (!user) {
    return null
  }
  if (isLoading) return <Spinner />

  return (
    <div className="container">
      {/* Dashboard Heading */}
      <section className="heading">
        <h1 className='text-5xl'>Welcome {user && user.data.name} 👋</h1>
        <p>Manage your goals and track your progress.</p>
      </section>

      {/* Dashboard Content */}
      <section className="content">
        <h2 className='text-2xl'>My Dashboard</h2>

        {/* Actions */}
        <div style={{ marginBottom: '5rem' }}>
          <GoalForm />
        </div>

        <div className="goal">
          <h3>Total Goals</h3>
          <h2>{goals.length}</h2>
        </div>
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <div key={goal._id} className="goal">
                <button
                  className="close"
                  onClick={() => handleDelete(goal._id)}
                  title="Delete Goal"
                >
                  ✕
                </button>

                <button
                    className="edit cursor-pointer"
                    onClick={() => handleUpdate(goal._id, goal.goal)}
                    title="Edit Goal"
                >
                    ✏️
                </button>

                <h3>{goal.goal}</h3>

                <div className="goal-date">
                  <span className='text-xs'>✦&nbsp;</span>
                  <span className='text-xs'>
                    Added on{' '}
                    {new Date(goal.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                  <span className='text-xs'>&nbsp;✦</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3>You haven't set any goals yet..!</h3>
        )}
      </section>
    </div>
  )
}

export default Dashboard