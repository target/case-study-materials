package com.target.jsb.controllers;


import com.google.gson.Gson;
import com.google.gson.JsonObject;

import org.hibernate.*;
import org.hibernate.query.Query;
import org.postgresql.core.NativeQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class HelloWorldController {

  @Autowired
  private SessionFactory sessionFactory;

  @GetMapping("hello")
  String health() throws Exception {
    String ret = "I tried to make two calls.";
    ret += "First I will call the database which should return the current time (" + makeDbCallExample() + ") ";
    ret += "Then I will make an api call which should give me a random street address " + makeAPICallExample();
    return ret;
  }

  private String makeAPICallExample()  {

    try {
      Gson gson = new Gson();

      URL url = new URL("http://fake_api:8000");
      InputStreamReader inputStream = new InputStreamReader(url.openStream());
      String result = new BufferedReader(inputStream)
              .lines().collect(Collectors.joining("\n"));

      JsonObject body = gson.fromJson(result, JsonObject.class);

      String randomAddress = body.get("address").getAsString();


      return randomAddress;

    } catch (Exception e) {
      e.printStackTrace();
      return "Unable to make an API call... if you are trying to run this outside of docker this will likely fail unless you are running the fake_api container locally";
    }

  }

  private String makeDbCallExample() {

    try {
      Session session;

      try {
        session = sessionFactory.getCurrentSession();
      } catch (HibernateException e) {
        session = sessionFactory.openSession();
      }

      Query query = session.createNativeQuery("select NOW() as time;");
      List<java.sql.Timestamp> rows = query.list();
      String res = "";
      for (java.sql.Timestamp row : rows) {
        res += row.toString();
      }
      return res;
    } catch (Exception e) {
      e.printStackTrace();
      return "Unable to make database call. Make sure you are pointing to the right location in HibernateConf. If you are running locally you will likely need to change dataSource.setUrl";
    }
  }


}
