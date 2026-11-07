import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { createGoal } from '../features/goals/goalSlice'

function GoalForm() {
  const [goal, setGoal] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createGoal({ goal }))
  }

  return (
    <>
      <section className='heading'>
        <p className='text-base'>Add a new goal and start tracking your progress!</p>
      </section>

      <section className='form' style={{marginTop: -40}}>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              className='form-control'
              id='goal'
              name='goal'
              value={goal}
              placeholder='Enter your goal...'
              onChange={(e) => setGoal(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <button type='submit' className='btn btn-block'>
              + Add New Goal
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default GoalForm
