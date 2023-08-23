package com.exam.examportal.helper;

public class UserFoundException extends Exception{

    public UserFoundException() {
        super("User is already registered!!");
    }
}
