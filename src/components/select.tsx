'use client'

import CreateableSelect from 'react-select/creatable';
import { SingleValue } from 'react-select';
import { useMemo } from 'react';

type Props = {
    onChange: (value?: string) => void
    onCreate?: (name: string) => void
    options: { label: string | null, value: string | null }[]
    value?: string | null | undefined
    disabled?: boolean
    placeholder?: string
}

export const Select = ({ onChange, onCreate, options, value, disabled, placeholder}: Props) => {

    const onSelect = (
        option: SingleValue<{ label: string | null, value: string }>
    ) => (
        onChange(option?.value)
    )

    const formattedValue = useMemo(() => {
        return options.find(option => option.value === value)
    }, [options, value])

    return (
        <CreateableSelect 
            placeholder={placeholder}
            isDisabled={disabled}
            className='text-sm h-10 bg-teal-300'    
            styles={{
                control: (base) => ({
                    ...base,
                    borderColor: '',
                    borderRadius: '6px',
                    boxShadow: 'none',
                    backgroundColor: '#f3f dark:#1a2',
                    ':hover': {
                        borderColor: ''
                    }
                })
            }}
            value={formattedValue}
            onChange={onSelect}
            options={options}
            onCreateOption={onCreate}
        />
    )
}