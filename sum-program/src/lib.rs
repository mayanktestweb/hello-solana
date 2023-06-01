use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};

#[derive(Debug, BorshDeserialize, BorshSerialize)]
pub struct MathStuff {
    sum: u32
}



entrypoint!(process_instruction);

// Program entrypoint's implementation
pub fn process_instruction(
    program_id: &Pubkey, // Public key of the account the hello world program was loaded into
    accounts: &[AccountInfo], // The account to say hello to
    _instruction_data: &[u8], // Ignored, all helloworld instructions are hellos
) -> ProgramResult {
    let acct_iter = &mut accounts.iter();
    let account = next_account_info(acct_iter)?;

    // check if account is owned by Progam or not
    if account.owner != program_id {
        msg!("Account is not owned by this Program!");
        return Err(ProgramError::InvalidAccountData);
    }

    let mut math_stuff_account = MathStuff::try_from_slice(&account.data.borrow())?;
    math_stuff_account.sum += 1;
    math_stuff_account.serialize(&mut *account.data.borrow_mut())?;

    msg!("Sum value is - {}",  math_stuff_account.sum);

    Ok(())
}